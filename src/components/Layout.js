import { Drawer, makeStyles, Typography, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { AddCircleOutline, ListOutlined } from "@mui/icons-material";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Colors from "../constants/Colors";


const drawerWidth = 240;

const useStyles = makeStyles({
    page: {
        background: Colors.gray,
        width: '100%',
        height: '100%',
        padding: 20,
    },
    drawer: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    root: {
        display: "flex",
    },
    active: {
        background: Colors.primaryColor,
    },
    title: {
        padding: 20,
        textAlign: "center",
        background: Colors.gray2
    }
})

export default function Layout({
    children
}) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const sidebarItems = [
        {
            text: 'Products',
            icon: <ListOutlined color={Colors.gray} />,
            path: '/',
        },
        {
            text: 'Create Product',
            icon: <AddCircleOutline color={Colors.gray} />,
            path: '/detail',
        },
    ];

    return (
        <div className={classes.root}>
            <Drawer 
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div>
                    <Typography variant="h5" className={classes.title} style={{ fontWeight: '700' }}>
                        My Merchant
                    </Typography>
                </div>

                <List style={{ padding: 0 }}>
                    {
                        sidebarItems.map((item) => (
                            <ListItem 
                                key={item.text} 
                                className={location.pathname === item.path ? classes.active : null}
                                button
                                onClick={() => history.push(item.path)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>


            <div className={classes.page}>
               {children} 
            </div>
            
        </div>
    )
}