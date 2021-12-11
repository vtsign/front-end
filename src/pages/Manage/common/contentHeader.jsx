import { Fragment, useState, useEffect, useRef } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { getAllContracts } from '../../../redux/actions/manageAction';

import './contentHeader.scss';
import { useDispatch, useSelector } from 'react-redux';

const ContentHeader = ({ title, description, status }) => {
	const [select, setSelect] = useState(10);
	const didMount = useRef(false);

	const handleChange = (event) => {
		setSelect(event.target.value);
	};
	const { contracts } = useSelector((state) => state.manageDoc);

	const [search, setSearch] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		let timer;
		if (didMount.current) {
			timer = setTimeout(() => {
				dispatch(getAllContracts({ status, page: 1, title: search }));
			}, 500);
		}
		else didMount.current = true;
		return () => clearTimeout(timer);
	}, [search]);

	const handleSearch = (event) => {
		setSearch(event.target.value);
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
						sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: 300 }}
					>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder="Tìm kiếm tài liệu..."
							inputProps={{ 'aria-label': 'search google maps' }}
							onChange={handleSearch}
						/>
						<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
							<SearchIcon />
						</IconButton>
					</Paper>
				</div>
			</div>
			<div>
				<div>
					{contracts != null && contracts.length > 0 && (
						<Fragment>
							<p style={{ marginBottom: '15px' }}>Danh sách tài liệu</p>
							{/* <FormControl sx={{ mt: 3, mb: 3 }}>
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
							</FormControl> */}
						</Fragment>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default ContentHeader;
