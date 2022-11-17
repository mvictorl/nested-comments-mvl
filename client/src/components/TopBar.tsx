import { FC, useState, MouseEvent, useContext } from 'react'
import { Context } from '../index'
import { isEmpty } from '../extensions/helpers'
import {
	AppBar,
	Box,
	Button,
	Avatar,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
} from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb'
import MenuIcon from '@mui/icons-material/Menu'
import LogIn from '@mui/icons-material/Login'
import Typography from '@mui/material/Typography'
import { IUser } from '../models/IUser'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export const TopBar: FC = () => {
	const { store } = useContext(Context)

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map(page => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(page => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page}
							</Button>
						))}
					</Box>

					<UserPlace user={store.user} />
				</Toolbar>
			</Container>
		</AppBar>
	)
}

function UserPlace(props: { user: IUser }): JSX.Element {
	const user = props.user
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	if (!isEmpty(user)) {
		return (
			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="Open settings">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar
							alt={user.name}
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
				</Menu>
			</Box>
		)
	} else {
		return (
			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="Login">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
		)
	}
}
