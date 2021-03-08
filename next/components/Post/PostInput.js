import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import IdleTimer from "react-idle-timer";
import _ from "lodash";
import Router from "next/router";
import shortid from "shortid";
// import Swal from "sweetalert2";

import PostInputForm from "./PostInputForm";
import FatalError from "components/Common/HandleError";

import {
  createPost,
  updatePost,
  publishPost,
  permanentlyDeletePost,
  checkSlug,
} from "../../lib/posts";
import { getTags } from "../../lib/tags";
import { titleCase, slugify, getCurrentUser } from "../../helpers/common";

const IDLE_TIMEOUT = 60 * 1000; // 60 seconds

//Headups, this is old style component -  if you don't like class, change it to functional (ex: PostList.js) :-)
export default class PostInput extends React.Component {
  _isMounted = false;
  _idleTimer = null;
  _msgTimer = null;
  state = {
    fileName: null,
    data: this.props.data ? this.props.data : {},
    allOptions: { tags: [] },
    isLoading: false,
    isError: false,
    fatalError: null,
    message: "",
    hasChanges: false,
  };

  static get propTypes() {
    return {
      originalId: PropTypes.string,
      data: PropTypes.object,
      signOut: PropTypes.func,
    };
  }

  async componentDidMount() {
    console.log("MOUNTING");
    this._isMounted = true;
    const ret = await getTags();

    const allTags = ret.data;
    const tagsInputOptions = allTags.map((item) => ({
      value: item.slug,
      text: item.name,
      key: item._id,
    }));

    const newAllOptions = {
      ...this.state.allOptions,
      tags: tagsInputOptions,
    };

    if (this._isMounted) {
      this.setState({ allOptions: newAllOptions });
    }
  }

  componentWillUnmount() {
    console.log("UNMOUNTING");
    this._isMounted = false;
    if (this._msgTimer) {
      clearTimeout(this._msgTimer);
    }
  }

  clearMessage = (ms) => {
    this._msgTimer = setTimeout(() => {
      this.setState({
        message: "",
      });
    }, ms);
  };

  autoFixSlug = async (slug) => {
    let newSlug = slugify(slug);
    const isExist = await checkSlug(newSlug);
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
    // autoSave on idle function instead
    // if (!this.debouncedFn) {
    //   this.debouncedFn = debounce(this.onSaveDraft, 10000);
    // }
    // this.debouncedFn();

    let name = key;
    let val = value;

    if (name === "tags") {
      val = val.map((value) => slugify(value));
    }

    const newInputs = {
      ...this.state.data,
      [name]: val,
    };

    this.setState({ data: newInputs, hasChanges: true });
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
   * case2: draft to publish, so we need to delete the original post if any - do update
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
      originalId: null,
    };

    //if this is the first time published, then set createdAt
    //if we edit a published post, which has originalId = null, and publish it before is auto saved,
    //then we don't want to overwrite createdAt, so we need to check isDraft or not.
    if (!this.state.data.originalId && this.state.data.isDraft) {
      postDataInput.createdAt = new Date().toISOString();
      postDataInput.updatedAt = postDataInput.createdAt;
    }

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
        try {
          await permanentlyDeletePost(this.state.data.originalId);
        } catch (err) {
          this.setState({ fatalError: err });
          newMessage = "Something went wrong!";
          error = true;
        }
      }
      try {
        if (doCreate) {
          await createPost(postDataInput);
        } else if (!this.state.data.originalId && this.state.data.isDraft) {
          // when no published yet, we publish draft using "put" to update createdAt to current
          await publishPost(this.state.data._id, postDataInput);
        } else {
          await updatePost(this.state.data._id, postDataInput);
        }
        Router.push(
          "/dashboard/posts?message=" + newMessage,
          "/dashboard/posts"
        );
      } catch (err) {
        this.setState({ fatalError: err });
        newMessage = "Something went wrong!";
        error = true;
      }
    }
    // only run when error, otherise, the page is redirected, which also prevent auto save from running
    if (error) {
      this.setState({
        isLoading: false,
        isError: error,
        message: newMessage,
      });

      this.clearMessage(3000);
    }
  };

  checkLogin = () => {
    const deniUser = getCurrentUser();
    if (!deniUser) {
      const err = "401";
      this.setState({ fatalError: err });
    }
  };

  /**
   * case1: new draft, i.e. not from editting a existing post - do create without original ID
   *  case1a: save draft after case1 - edit existing draft, but not pubish the post yet - so follow case3
   * case2: exisiting post to draft - do create with original ID
   *  case2a: save draft after case2 -  edit published post, but has a draft already - should update draft
   *  NO MORE case2a, because when there is a draft, we will load draft not the published one. - so follow case3
   * case3: draft to draft - do update
   *
   */

  onSaveDraft = async () => {
    if (this.state.isLoading || !this.state.hasChanges) {
      return; //stop auto saving when it's loading, i.e. publishing. or nothing changed
    }

    // if (isExpired(this.props.accessToken)) {
    //   //log out
    //   let timerInterval;
    //   Swal.fire({
    //     title: "Session is Expired!",
    //     html: "You will be logged out in <b></b> seconds.",
    //     timer: 5000,
    //     timerProgressBar: true,
    //     onBeforeOpen: () => {
    //       Swal.showLoading();
    //       timerInterval = setInterval(() => {
    //         const content = Swal.getContent();
    //         if (content) {
    //           const b = content.querySelector("b");
    //           if (b) {
    //             b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
    //           }
    //         }
    //       }, 1000);
    //     },
    //     onClose: () => {
    //       clearInterval(timerInterval);
    //     },
    //   }).then((result) => {
    //     /* Read more about handling dismissals below */
    //     if (result.dismiss === Swal.DismissReason.timer) {
    //       this.props.signOut();
    //     }
    //   });
    // }

    // //if token will be expired in 5 mins, then autoRenew it
    // else if (isExpired(this.props.accessToken, 5)) {
    //   await this.props.reLogin();
    // }

    const postDataInput = {
      ...this.state.data,
      tagOptions: this.getTagOptions(),
      isDraft: true,
      isDeleted: false,
    };
    let doCreate = true;
    if (!this.state.data._id) {
      //has no id - case 1
      postDataInput.originalId = null;
    } else if (!this.state.data.isDraft) {
      //has id, but not a draft - case2
      postDataInput.originalId = this.state.data._id;
    } else {
      // has id and it's draft
      doCreate = false; //do update on existing draft
    }
    if (postDataInput._id) {
      delete postDataInput._id;
    }
    this.setState({ isLoading: true, isError: false, message: "" });
    let newMessage = "Draft saved!";
    try {
      if (doCreate) {
        const draftId = null;
        // we don't need to check draft anymore, because if there is draft, we load draft,
        // then the state.data._id exists & isDraft = true, then doCreate = false

        // below is old code for reference only
        // let draftId = 0;
        // if (this.state.data._id) {
        //   const draft = await getDraft(
        //     this.props.accessToken,
        //     this.state.data._id
        //   );
        //   if (draft && draft.total > 0) {
        //     draftId = draft.data[0]._id;
        //     await updatePost(this.props.accessToken, draftId, postDataInput);
        //   }
        // }
        if (!draftId) {
          const result = await createPost(postDataInput);

          if (result && result.data) {
            //case2a
            this.setState({
              data: result.data,
            });
          }
        }
      } else await updatePost(this.state.data._id, postDataInput);
    } catch (err) {
      newMessage = "Something wrong!";
      this.setState({ isError: true, fatalError: err });
    }
    this.setState({
      isLoading: false,
      message: newMessage,
      hasChanges: false,
    });

    this.clearMessage(3000);
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
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          timeout={IDLE_TIMEOUT}
          onIdle={this.onSaveDraft}
        />
        {this.state.fatalError && <FatalError error={this.state.fatalError} />}
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
        />
      </Container>
    );
  }
}
