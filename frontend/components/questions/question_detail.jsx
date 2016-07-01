const React = require('react');
const QuestionStore = require('../../stores/question_store.js');
const QuestionActions = require('../../actions/question_actions.js');
const QuestionIndexItem = require('./question_index_item');
const cloudinaryConfig = require('react-cloudinary').cloudinaryConfig;
const CloudinaryImage = require('react-cloudinary').CloudinaryImage;
cloudinaryConfig({ cloud_name: 'dxhqr7u1z' });
const imagePublicId = 'user_j20bee';

const QuestionDetail = React.createClass({
  getInitialState () {
    return ({
      question: {}
    });
  },

  _onChange () {
    this.setState({
      question: QuestionStore.find(this.props.params.questionId)
    });
  },

  componentDidMount () {
    this.questionListener = QuestionStore.addListener(this._onChange);
    QuestionActions.fetchQuestion(this.props.params.questionId);
  },

  componentWillUnmount () {
    this.questionListener.remove();
  },

  createdAgo () {
    let createdAgo = this.state.question.createdAgo;

    return (
      <span className='light-text'>
        , { createdAgo } ago
      </span>
    );
  },

  render () {
    return(
      <div className="question-detail">
        <div className="question-col">
          <h4>
            <h2>{ this.state.question.title }</h2>
            <p>
              <CloudinaryImage
                className="author-icon"
                publicId={ imagePublicId }
                options={{ width: 16, height: 16 }} />
              { this.state.question.authorName }
              { this.createdAgo() }
            </p>
          </h4>
          <br />
          <p>{ this.state.question.description }</p>
        </div>
        <div className="related-col">
          <div className="related-col-content">
            <h4>Related Questions</h4>
            <ul>
              <li>Question</li>
              <li>Question</li>
              <li>Question</li>
              <li>Question</li>
              <li>Question</li>
              <li>Question</li>
              <li>Question</li>
              <li>Question</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = QuestionDetail;
