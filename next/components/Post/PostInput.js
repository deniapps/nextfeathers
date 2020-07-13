import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import _ from "lodash";
import Router from "next/router";

import PostInputForm from "./PostInputForm";

import { createPost, updatePost, deletePost } from "../../lib/posts";
import { getTags } from "../../lib/tags";
import { titleCase, slugify } from "../../helpers/common";

//Old style if you don't like class, change it to functional (ex: PostList.js) :-)

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

  updateInput = (event, key, value) => {
    let name = key;
    let val = value;
    if (event) {
      name = event.target.name;
      val = event.target.value;
    }
    if (name === "tags") {
      val = val.map((value) => slugify(value));
    }

    const newInputs = {
      ...this.state.data,
      [name]: val,
    };

    this.setState({ data: newInputs });
  };

  autoGenerateSlug = () => {
    //after entering title, create slug if there is no slug
    if (this.state.data.title && !this.state.data.slug) {
      const newInputs = {
        ...this.state.data,
        slug: slugify(this.state.data.title),
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
      Router.push("/dashboard/posts?message=" + newMessage, "/dashboard/posts");
    } catch (error) {
      newMessage = "Something wrong!";
      this.setState({ isError: true });
    }
    this.setState({ isLoading: false, message: newMessage });
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
    console.log(postDataInput);
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
          handleAllFocus={{ slug: this.autoGenerateSlug }}
        />
      </Container>
    );
  }
}
