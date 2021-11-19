import { Fragment, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';

import './contentHeader.scss';

const ContentHeader = ({ title, description, isShow }) => {
	console.log('isShow', isShow);
	const [select, setSelect] = useState(10);
	const handleChange = (event) => {
		setSelect(event.target.value);
	};
	return (
		<Fragment>
			<div className="content-header">
				<div>
					<p className="content-header-title">{title}</p>
					<div className="content-header-note">{description}</div>
				</div>
				<div>
					<Paper
						component="form"
						sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: 300 }}
					>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder="Search contract"
							inputProps={{ 'aria-label': 'search google maps' }}
						/>
						<IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
							<SearchIcon />
						</IconButton>
					</Paper>
				</div>
			</div>
			<div>
				<div>
					<p>Danh sách tài liệu</p>
					<FormControl sx={{ mt: 3, mb: 3 }} disabled={!isShow}>
						<InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={select}
							label="Sắp xếp"
							onChange={handleChange}
							className="content-btn-sort"
						>
							<MenuItem value={10}>Tất cả</MenuItem>
							<MenuItem value={20}>Gần nhất</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>
		</Fragment>
	);
};

export default ContentHeader;
