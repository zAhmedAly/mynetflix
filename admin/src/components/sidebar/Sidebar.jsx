import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  PlayCircleOutline,
  List,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  AddToQueue,
  QueuePlayNext,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li>
              <Link to="/" className="link">
                <div className="sidebarListItem active">
                  <LineStyle className="sidebarIcon" />
                  Home
                </div>
              </Link>
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <li>
              <Link to="/users" className="link">
                <div className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Users
                </div>
              </Link>
            </li>
            <li>
              <Link to="/movies" className="link">
                <div className="sidebarListItem">
                  <PlayCircleOutline className="sidebarIcon" />
                  Movies
                </div>
              </Link>
            </li>
            <li>
              <Link to="/lists" className="link">
                <div className="sidebarListItem">
                  <List className="sidebarIcon" />
                  Lists
                </div>
              </Link>
            </li>
            <li>
              <Link to="/newMovie" className="link">
                <div className="sidebarListItem">
                  <AddToQueue className="sidebarIcon" />
                  Add Movie
                </div>
              </Link>
            </li>
            <li>
              <Link to="/newList" className="link">
                <div className="sidebarListItem">
                  <QueuePlayNext className="sidebarIcon" />
                  Add List
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
