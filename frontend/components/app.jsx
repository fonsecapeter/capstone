"use strict";

const React = require('react');
const Link = require('react-router').Link;
const Boron = require('boron');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const SignInForm = require('./sign_in_form');
const QuestionAskForm = require('./questions/question_ask_form');

const cloudinaryConfig = require('react-cloudinary').cloudinaryConfig;
const CloudinaryImage = require('react-cloudinary').CloudinaryImage;
cloudinaryConfig({ cloud_name: 'dxhqr7u1z' });
const imagePublicId = 'user_j20bee';

const App = React.createClass({
  componentDidMount () {
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  _onSignOut () {
    SessionActions.signOut();
  },

  _guestSignIn() {
    SessionActions.signIn({
      username: 'guest',
      password: 'password'
    });
  },

  greeting () {
    if (SessionStore.isUserSignedIn()) {
      return (
        <hgroup className="header-group">
          <p className="header-name">
            <CloudinaryImage
              className="author-icon"
              publicId={imagePublicId}
              options={{ width: 16, height: 16 }} />
          { SessionStore.currentUser().username }
        </p>
          <input type="submit"
            className="header-sign-out-button button"
            value="sign out"
            onClick={ this._onSignOut } />
        </hgroup>
      );
    } else {
      return (
        <nav className="sign-in-up">
          <button className="red-button" onClick={ this._guestSignIn }>
            Guest
          </button>
          {
            ['sign_in', 'sign_up'].map( name => {
              return this.getTriggerAndModal(name);
            })
          }
        </nav>
      );
    }
  },

  // modal ---------------------------------------------------------------------
  toggleDialog: function(ref){
    return () => {
      this.refs[ref].toggle();
    };
  },

  getContent: function(modalName){
    return <div className="sign-in-modal-container">
    <SignInForm signType={ modalName } />
    <button
      onClick={ this.toggleDialog(modalName) }>
      Cancel
    </button>
    </div>;
  },

  getTriggerAndModal: function(modalName){
    let Modal = Boron['FadeModal'];

    return (
      <div key={ modalName }>
      <button onClick={ this.toggleDialog(modalName) }>
        {modalName.split("_").join(" ")}
      </button>

      <Modal
        ref={ modalName }
        className="sign-in-modal-container">
        { this.getContent(modalName) }
      </Modal>
      </div>
    );
  },
  // ---------------------------------------------------------------------------

  render () {
    const self = this;
    return (
      <div>
        <header>
          <hgroup className="logo">
            <Link to='/' className='header-link'><h1>Glia</h1></Link>
          </hgroup>
          <hgroup className="dummy-ask">
            <QuestionAskForm />
          </hgroup>
          { this.greeting() }
        </header>
        <div className="app-children">
          { this.props.children }
        </div>
      </div>
    );
  }
});

module.exports = App;
