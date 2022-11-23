import { useContext, useState, MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import {
	Avatar,
	Box,
	Divider,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from '@mui/material'
import { Login as LogIn, Logout as LogOut } from '@mui/icons-material'

const settings = ['Profile', 'Account', 'Dashboard']

function UserAvatar(): JSX.Element {
	const { store } = useContext(Context)
	const navigate = useNavigate()

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const hanleLogout = async () => {
		await store.logout()
		setAnchorElUser(null)
		navigate('/home')
	}

	if (store.user !== null) {
		return (
			<>
				<Box sx={{ flexGrow: 0 }}>
					<Tooltip title="Open settings">
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							<Avatar
								alt={store.user.name}
								// src={store.user?.avatar}
							/>
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: '45px' }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						{settings.map(setting => (
							<MenuItem key={setting} onClick={handleCloseUserMenu}>
								<Typography textAlign="center">{setting}</Typography>
							</MenuItem>
						))}
						<Divider />
						<MenuItem onClick={() => hanleLogout()}>
							<ListItemIcon>
								<LogOut />
							</ListItemIcon>
							<ListItemText>
								<Typography textAlign="center">Logout</Typography>
							</ListItemText>
						</MenuItem>
					</Menu>
				</Box>
			</>
		)
	} else {
		return (
			<>
				<Box sx={{ flexGrow: 0 }}>
					<Tooltip title="Login">
						<IconButton sx={{ p: 0 }} to="/login" component={Link}>
							<LogIn
								sx={{
									fontWeight: 700,
									textDecoration: 'none',
									color: 'white',
								}}
							/>
						</IconButton>
					</Tooltip>
				</Box>
			</>
		)
	}
}

export default observer(UserAvatar)
