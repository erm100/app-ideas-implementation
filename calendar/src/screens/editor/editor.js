import {connect} from 'react-redux';
import {actions} from 'src/state';
import EditorScreen from './editor.screens';

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    events: state.eventList.events,
    ids: state.eventList.ids,
  };
};

const mapDispatchToProps = {...actions};

export const Editor = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorScreen);
