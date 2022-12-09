import { useState, MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { observer } from 'mobx-react-lite'
// import { Context } from '..'
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
import {
	Login as LogIn,
	Logout as LogOut,
	AccountBox,
	Settings,
} from '@mui/icons-material'

import { useAuth } from '../hooks/useAuth'

// const settings = ['Profile', 'Account', 'Dashboard']

function UserAvatar(): JSX.Element {
	// const { store } = useContext(Context)
	const navigate = useNavigate()

	const auth = useAuth()

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const handleProfile = async () => {
		setAnchorElUser(null)
		navigate('/profile')
	}
	const handleAccount = async () => {
		setAnchorElUser(null)
		navigate('/account')
	}
	const handleLogout = async () => {
		await auth.signout()
		setAnchorElUser(null)
		navigate('/home')
	}

	if (auth.isAuth) {
		return (
			<>
				<Box sx={{ flexGrow: 0 }}>
					<Tooltip title="Open settings">
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							<Avatar
								alt={auth?.user?.name}
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
						{/* {settings.map(setting => (
							<MenuItem key={setting} onClick={handleCloseUserMenu}>
								<Typography textAlign="center">{setting}</Typography>
							</MenuItem>
						))} */}
						<MenuItem onClick={handleProfile}>
							<ListItemIcon>
								<AccountBox />
							</ListItemIcon>
							<ListItemText>
								<Typography textAlign="left">Profile</Typography>
							</ListItemText>
						</MenuItem>
						<MenuItem onClick={handleAccount}>
							<ListItemIcon>
								<Settings />
							</ListItemIcon>
							<ListItemText>
								<Typography textAlign="left">Account</Typography>
							</ListItemText>
						</MenuItem>
						<Divider />
						<MenuItem onClick={handleLogout}>
							<ListItemIcon>
								<LogOut />
							</ListItemIcon>
							<ListItemText>
								<Typography textAlign="left">Logout</Typography>
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

// export default observer(UserAvatar)
export default UserAvatar
