import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BrushIcon from '@mui/icons-material/Brush';
import SettingsIcon from '@mui/icons-material/Settings';
import FilterIcon from '@mui/icons-material/Filter';
import Link from 'next/link'

export default function MenuBar() {
    return (
        <div>
            <div className="header text-home">
                Home page
            </div>
            <div className="main-content">
                <div className="sidebar-home">
                    <Box role="presentation">
                        <List>
                            <ListItem disablePadding>
                                <Link href="/listTemplate">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <BrushIcon></BrushIcon>
                                        </ListItemIcon>
                                        <ListItemText primary={'Templates'} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem disablePadding>
                                {/* <Link href="/listTemplate"> */}
                                <ListItemButton>
                                    <ListItemIcon>
                                        <FilterIcon></FilterIcon>
                                    </ListItemIcon>
                                    <ListItemText primary={'Clip arts'} />
                                </ListItemButton>
                                {/* </Link> */}
                            </ListItem>
                            <ListItem disablePadding>
                                <Link href="/listOptionSet">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <SettingsIcon></SettingsIcon>
                                        </ListItemIcon>
                                        <ListItemText primary={'Options'} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                    </Box>
                </div>
            </div>
        </div>
    )
}