import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import SendIcon from '@mui/icons-material/Send';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import InboxIcon from '@mui/icons-material/Inbox';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export const mainListItems = (
  <div>
    <ListItemLink button className="bk_clr" href={"/Compose"}>
      <ListItemIcon>
        <AddCommentIcon />
      </ListItemIcon>
      <ListItemText primary="Compose" />
    </ListItemLink>
    <ListSubheader inset>Quick view</ListSubheader>
    <ListItemLink button href={"/Inbox"}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItemLink>
    <ListItemLink button href={"/Sent"}>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Sent" />
    </ListItemLink>
    <ListItemLink button href={"/Trash"}>
      <ListItemIcon>
        <RestoreFromTrashIcon />
      </ListItemIcon>
      <ListItemText primary="Trash" />
    </ListItemLink>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItemLink button href={"/Profile"}>
      <ListItemIcon>
        <AssignmentIndIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemLink>
    <ListItemLink button href={"/Home"}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemLink>
  </div>
);