import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationElement } from './style';

export default class Navigation extends React.Component {
  render() {
    return (
      <NavigationElement>
        <Link to="/home" className="link">
          <div className={this.props.currentActive === "home" ? "menuItem active" : "menuItem"}>
            <i className="fas fa-home" />
          </div>
        </Link>
        <Link to="/tasks" className="link">
          <div className={this.props.currentActive === "tasks" ? "menuItem active" : "menuItem"}>
            <i className="fas fa-tasks" />
          </div>
        </Link>
        <Link to="/members" className="link">
          <div className={this.props.currentActive === "members" ? "menuItem active" : "menuItem"}>
            <i className="fas fa-users" />
          </div>
        </Link>
        <Link to="profile" className="link">
          <div className={this.props.currentActive === "profile" ? "menuItem active" : "menuItem"}>
            <i className="fas fa-user" />
          </div>
        </Link>
        <Link to="rating" className="link">
          <div className={this.props.currentActive === "rating" ? "menuItem active" : "menuItem"}>
            <i className="fas fa-star" />
          </div>
        </Link>
      </NavigationElement>
    );
  }
}