import {connect} from 'react-redux';
import {actions} from 'src/state';
import MainScreen from './main.screens';

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    delEvent: state.remove.event,
    editId: state.edit.id,
    editTime: state.edit.time,
    addId: state.add.id,
    events: state.eventList.events,
    ids: state.eventList.ids,
  };
};

const mapDispatchToProps = {...actions};

export const Main = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainScreen);
