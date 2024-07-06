
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import BioDataCard from './BioDataCard/BioDataCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hoock/useAxiosPublic';
import { Helmet } from 'react-helmet-async';

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 1;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,

        },
    },
};

// 1 no start here
const names = [
    'Male',
    'Female',
];

// 2 no start here
const division = ['Dhaka', 'Chattagram', 'Rangpur', 'Barisal', 'Khulna', 'Maymansign', 'Sylhet', 'other']
const ages = [
   '18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'
];





// 1 no start here
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

// 2 no start here

function getStyles2(status1, status2, theme) {
    return {
        fontWeight:
            status2.indexOf(status1) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

// 3 no start here

function getStylesAge(age, personAge, theme) {
    return {
        fontWeight:
            personAge.indexOf(age) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const BioData = () => {


    const axiosPublic = useAxiosPublic();

    const { data: items } = useQuery({
        queryKey: ['usersBiodata'],
        queryFn: async () => {
            const res = await axiosPublic.get('/usersBiodata');
            return res.data;
        }
    });


    const theme = useTheme();

    // 1 no start here
    const [personName, setPersonName] = useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    // 2 no start here
    const [status2, setStatus2] = useState([]);
    const handleChange2 = (event) => {
        const { target: { value },
        } = event;
        setStatus2(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    // 3 no start here
    const [personAge, setPersonAge] = useState([]);
    const handleAgeChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonAge(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

   
    console.log(personName[0], status2[0], personAge[0])


    // const onChangeFilter = () =>{

    // }
    const filteredItems = items?.filter(item => {
        // Apply filters based on selected values
        const nameMatch = personName.length === 0 || personName.includes(item.bioType);
        const divisionMatch = status2.length === 0 || status2.includes(item.parmanentDivision);
        const ageMatch = personAge.length === 0 || personAge.includes(item.age.toString());
    
        return nameMatch && divisionMatch && ageMatch;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    const bioLength = items?.length
    console.log(bioLength)



    return (
        <div className='mt-40'>
             <Helmet>
                <title>P.L || Biodata</title>
            </Helmet>
            <div className="flex flex-col md:flex-row border justify-between mt-10 p-2">
                <div className=" bg-white shadow-2xl p-4 md:w-1/3 lg:w-1/4  ">
                    <h1 className="text-xl text-red-400 font-bold text-center uppercase">Filter option</h1>
                    <p className="text-center">As soon as you select the option here, it will be filtered!</p>
                    <div className='mt-5 '>
                        <Accordion className=''>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Filter
                            </AccordionSummary>

                            <Accordion className='border border-b-0'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    General Info
                                </AccordionSummary>

                                <AccordionDetails>
                                    <fieldset className="w-full space-y-1 dark:text-gray-800">
                                        <label htmlFor="price" className="block text-sm font-medium">BioData Type</label>
                                        <div className="flex">
                                            <div>
                                                <FormControl sx={{ width: 210 }}>
                                                    <Select

                                                        displayEmpty
                                                        value={personName}
                                                        onChange={handleChange}
                                                        input={<OutlinedInput />}
                                                        renderValue={(selected) => {
                                                            if (selected.length === 0) {
                                                                return <em>Select</em>;
                                                            }

                                                            return selected.join(', ');
                                                        }}
                                                        MenuProps={MenuProps}
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >

                                                        {names.map((name) => (
                                                            <MenuItem
                                                                key={name}
                                                                value={name}
                                                                style={getStyles(name, personName, theme)}
                                                            >
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </fieldset>

                                </AccordionDetails>

                                <AccordionDetails>
                                    <fieldset className="w-full space-y-1 dark:text-gray-800">
                                        <label htmlFor="price" className="block text-sm font-medium">Divison</label>
                                        <div className="flex">
                                            <div>
                                                <FormControl sx={{ width: 210 }}>
                                                    <Select

                                                        displayEmpty
                                                        value={status2}
                                                        onChange={handleChange2}
                                                        input={<OutlinedInput />}
                                                        renderValue={(selected) => {
                                                            if (selected.length === 0) {
                                                                return <em>Select division</em>;
                                                            }

                                                            return selected.join(', ');
                                                        }}
                                                        MenuProps={MenuProps}
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >

                                                        {division.map((division) => (
                                                            <MenuItem
                                                                key={division}
                                                                value={division}
                                                                style={getStyles2(division, status2, theme)}
                                                            >
                                                                {division}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </fieldset>

                                </AccordionDetails>

                                <AccordionDetails>
                                    <fieldset className="w-full space-y-1 dark:text-gray-800">
                                        <label htmlFor="price" className="block text-sm font-medium">Max Age Range</label>
                                        <div className="flex">
                                            <div>
                                                <FormControl sx={{ width: 210 }}>
                                                    <Select

                                                        displayEmpty
                                                        value={personAge}
                                                        onChange={handleAgeChange}
                                                        input={<OutlinedInput />}
                                                        renderValue={(selected) => {
                                                            if (selected.length === 0) {
                                                                return <em>Select Range</em>;
                                                            }

                                                            return selected.join(', ');
                                                        }}
                                                        MenuProps={MenuProps}
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >

                                                        {ages.map((age) => (
                                                            <MenuItem
                                                                key={age}
                                                                value={age}
                                                                style={getStylesAge(age, personAge, theme)}
                                                            >
                                                                {age}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </fieldset>

                                </AccordionDetails>


                            </Accordion>


                        </Accordion>

                    </div>
                </div>


                {/* other side */}
                <div className="md:w-3/5 lg:w-2/3">
                    <h1 className='text-center font-bold py-5'>Total Bio data : {items?.length}</h1>


                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        {
                            currentItems?.map(item => <BioDataCard key={item._id} item={item} bioLength={bioLength}></BioDataCard>)
                        }
                    </div>
                    <div className="mt-5 flex justify-end">
                        {filteredItems && (
                            <nav className="pagination">
                                <ul className="flex list-none">
                                    {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => (
                                        <li key={i} className="cursor-pointer mx-1">
                                            <button
                                                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                                onClick={() => paginate(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BioData;