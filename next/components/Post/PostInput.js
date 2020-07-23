import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import _ from "lodash";
import Router from "next/router";
import shortid from "shortid";

import PostInputForm from "./PostInputForm";

import { createPost, updatePost, deletePost, checkSlug } from "../../lib/posts";
import { getTags } from "../../lib/tags";
import { titleCase, slugify } from "../../helpers/common";

//Headps, this is old style component -  if you don't like class, change it to functional (ex: PostList.js) :-)

export default class PostInput extends React.Component {
  state = {
    fileName: null,
    data: this.props.data ? this.props.data : {},
    allOptions: { tags: [] },
    isLoading: false,
    isError: false,
    message: "",
  };

  static get propTypes() {
    return {
      accessToken: PropTypes.string,
      originalId: PropTypes.string,
      data: PropTypes.object,
    };
  }

  async componentDidMount() {
    const ret = await getTags(this.props.accessToken);

    const allTags = ret.data.data;
    const tagsInputOptions = allTags.map((item) => ({
      value: item.slug,
      text: item.name,
      key: item._id,
    }));

    const newAllOptions = {
      ...this.state.allOptions,
      tags: tagsInputOptions,
    };

    this.setState({ allOptions: newAllOptions });
  }

  autoFixSlug = async (slug) => {
    let newSlug = slugify(slug);
    const isExist = await checkSlug(this.props.accessToken, newSlug);
    if (isExist) {
      newSlug += "-" + shortid.generate().toLowerCase();
    }
    return newSlug;
  };

  validateSlug = async () => {
    const currentSlug = this.state.data.slug;
    if (currentSlug) {
      const slug = await this.autoFixSlug(currentSlug);
      const newInputs = {
        ...this.state.data,
        slug: slug,
      };
      this.setState({ data: newInputs });
    }
  };

  updateInput = async (key, value) => {
    let name = key;
    let val = value;

    if (name === "tags") {
      val = val.map((value) => slugify(value));
    }

    const newInputs = {
      ...this.state.data,
      [name]: val,
    };

    this.setState({ data: newInputs });
  };

  // custom action - when ckeditor upload a image, auto add feature image
  autoGenerateFeatureImage = (url) => {
    if (!this.state.data.image) {
      this.updateInput("image", url);
    }
  };

  autoGenerateSlug = async () => {
    //after entering title, create slug if there is no slug
    if (this.state.data.title && !this.state.data.slug) {
      const slug = await this.autoFixSlug(this.state.data.title);

      const newInputs = {
        ...this.state.data,
        slug: slug,
      };
      this.setState({ data: newInputs });
    }
  };

  handleAddition = (value, key) => {
    const caseFixedText = titleCase(value);
    const caseFixedValue = slugify(value);

    // avoid duplicated addtion
    if (!_.find(this.state.allOptions[key], { value: caseFixedValue })) {
      const newOption = {
        text: caseFixedText,
        value: caseFixedValue,
        key: caseFixedValue,
      };
      const newOptions = [...this.state.allOptions[key], newOption];
      const newAllOptions = {
        ...this.state.allOptions,
        [key]: newOptions,
      };
      // console.log(newAllOptions);
      this.setState({ allOptions: newAllOptions });
    }
  };

  //tagOptions is used to update tags table for any new tags
  getTagOptions = () => {
    let tagOptions = [];
    if (this.state.data.tags) {
      tagOptions = this.state.allOptions.tags.filter((tag) =>
        this.state.data.tags.includes(tag.value)
      );
    }
    return tagOptions;
  };

  /**
   * case1: new post - do create
   * case2: draft to publish, so we need to delete the original post - do update
   * case3: publish to publish - do update
   */

  onPublish = async () => {
    this.setState({ isLoading: true, isError: false, message: "" });
    let newMessage = "Published";
    let error = false;
    const postDataInput = {
      ...this.state.data,
      tagOptions: this.getTagOptions(),
      isDraft: false,
      isDeleted: false,
      originalId: this.state.data.originalId
        ? this.state.data.originalId
        : null,
    };
    console.log(postDataInput);
    // Final Validation
    if (!postDataInput.title) {
      error = true;
      newMessage = "Title is required!";
    } else if (!postDataInput.summary) {
      error = true;
      newMessage = "Summary is required!";
    } else if (!postDataInput.slug) {
      error = true;
      newMessage = "Slug is required!";
    } else if (!postDataInput.content) {
      error = true;
      newMessage = "Content is required!";
    }

    if (!error) {
      let doCreate = true;

      if (this.state.data._id) {
        doCreate = false;
        delete postDataInput._id;
      }
      if (this.state.data.originalId) {
        await deletePost(this.props.accessToken, this.state.data.originalId);
      }
      try {
        if (doCreate) {
          await createPost(this.props.accessToken, postDataInput);
        } else {
          await updatePost(
            this.props.accessToken,
            this.state.data._id,
            postDataInput
          );
        }
        Router.push(
          "/dashboard/posts?message=" + newMessage,
          "/dashboard/posts"
        );
      } catch (err) {
        newMessage = "Something wrong!";
        error = true;
      }
    }
    this.setState({ isLoading: false, isError: error, message: newMessage });
  };

  /**
   * case1: new draft, i.e. not from editting existing post - do create without original ID
   * case2: exisiting post to draft - do create with original ID
   * case3: draft to draft - do update
   */

  onSaveDraft = async () => {
    const postDataInput = {
      ...this.state.data,
      tagOptions: this.getTagOptions(),
      isDraft: true,
      isDeleted: false,
    };
    let doCreate = true;
    if (!this.state.data._id) {
      postDataInput.originalId = null;
    } else if (!this.state.data.isDraft) {
      postDataInput.originalId = this.state.data._id;
    } else {
      doCreate = false; //do update on existing draft
    }
    if (postDataInput._id) {
      delete postDataInput._id;
    }
    this.setState({ isLoading: true, isError: false, message: "" });
    let newMessage = "Draft saved!";
    try {
      if (doCreate) await createPost(this.props.accessToken, postDataInput);
      else
        await updatePost(
          this.props.accessToken,
          this.state.data._id,
          postDataInput
        );
    } catch (error) {
      newMessage = "Something wrong!";
      this.setState({ isError: true });
    }
    this.setState({
      isLoading: false,
      message: newMessage,
    });
  };

  handleChange = () => {
    const isInline = this.state.inlineField;

    this.setState({
      inlineField: !isInline,
    });
  };

  render() {
    return (
      <Container text style={{ marginBottom: "40px" }}>
        <PostInputForm
          handleChange={this.handleChange}
          onPublish={this.onPublish}
          onSaveDraft={this.onSaveDraft}
          inputData={this.state.data}
          updateInput={this.updateInput}
          handleAddition={this.handleAddition}
          allOptions={this.state.allOptions}
          message={this.state.message}
          isError={this.state.isError}
          isLoading={this.state.isLoading}
          handleAllFocus={{}}
          handleAllBlur={{
            slug: this.validateSlug,
            title: this.autoGenerateSlug,
          }}
          autoGenerateFeatureImage={this.autoGenerateFeatureImage}
          accessToken={this.props.accessToken}
        />
      </Container>
    );
  }
}
