import { observer } from 'mobx-react-lite'
import { Container, Typography } from '@mui/material'

const Home = () => {
	return (
		<>
			<Container>
				<Typography textAlign="justify" variant="h5"></Typography>
				<Typography textAlign="justify">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime et ea
					distinctio repellendus veritatis officia, sunt explicabo repudiandae
					vitae at sed. Molestiae hic autem deserunt quasi laudantium deleniti.
					Expedita, a!
				</Typography>
			</Container>
		</>
	)
}

export default observer(Home)
