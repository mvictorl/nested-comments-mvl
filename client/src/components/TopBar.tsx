import { useState, useContext, MouseEvent } from 'react'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material'
import { Adb as AdbIcon, Menu as MenuIcon } from '@mui/icons-material'
import UserAvatar from './UserAvatar'
import { pages } from '../pages'

const TopBar = () => {
	const { store } = useContext(Context)
	const navigate = useNavigate()

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleClickNavMenuItem = (link: string) => {
		setAnchorElNav(null)
		navigate(link)
	}

	const currentPages = pages.filter(p => {
		if (p.access === 'PUBLIC') {
			return true
		} else {
			if (
				store.user != null &&
				store.user.roles != null &&
				store.user.roles.includes(p.access)
			) {
				return true
			}
		}
		return false
	})

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
							{currentPages.map(page => (
								<MenuItem
									key={page.name}
									onClick={() => handleClickNavMenuItem(page.link)}
								>
									<Typography textAlign="center">{page.name}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
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
						{currentPages.map(page => (
							<Button
								key={page.name}
								onClick={() => handleClickNavMenuItem(page.link)}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page.name}
							</Button>
						))}
					</Box>

					<UserAvatar />
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default observer(TopBar)
