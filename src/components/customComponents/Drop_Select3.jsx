// import { Button } from '@mui/material';
import { Button as MuiButton } from "@mui/material";
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from "react-redux";
import { callApi } from "../../redux/utils/apiActions";
import { GET } from "../utils/Const";

const DropSelect3 = ({
    component,
    values,
    onSubmit
}) => {
    const dispatch = useDispatch();
    const [modified, setModified] = useState(false);
    const [visited, setVisited] = useState(false);
    const [selections, setSelections] = useState([]);
    const [popupState, setPopupState] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [options, setOptions] = useState(component.options);



    useEffect(() => {
        if (component.fetchOptionsApi) {
            dispatch(callApi({
                url: component.fetchOptionsApi,
                method: GET,
                headers: { "Content-Type": "application/json" },
            })).then((res) => {
                if (res.payload?.data?.["sectorNumber"]) {
                    setOptions(res.payload?.data?.[component.optionKey]);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (typeof values === "string") {
            setSelections([values]);
        } else if (typeof values === "object") {
            setSelections([...values]);
        } else {
            setSelections([]);
        }
    }, [values]);

    const debounceSearch = () => {

    };

    const handleChange = (option) => {
        if (component.maxAllowed === 1) {
            setSelections([option.value]);
            setModified(true);
        } else {
            if (selections.includes(option.value)) {
                setSelections(selections.filter(selection => selection !== option.value));
                setModified(true);
            } else {
                setSelections([...selections, option.value]);
                setModified(true);
            }
        }
    };

    const handleSubmit = () => {
        if (popupState) {
            if (modified) {
                onSubmit(component.maxAllowed === 1 ? selections[0] : selections);
                setModified(false);
                setVisited(false);
            }
            setPopupState(false);
        } else {
            setPopupState(true);
            setVisited(false);
        }
    };

    const handleSearch = (e) => {
        if (!e.target.value || e.target.value === "") {
            setShowSearchResults(false);
            setSearchResults([]);
        } else {
            setShowSearchResults(true);
            const filteredOptions = options.filter(option => (option.value.toLowerCase().includes(e.target.value.toLowerCase()) || option.label.toLowerCase().includes(e.target.value.toLowerCase()))) || [];
            setSearchResults(filteredOptions);
        }
    };

    return (
        <div
            className={`drop_select_wrapper ${component?.className}`}
            onMouseLeave={() => {
                if (popupState && visited) {
                    handleSubmit();
                }
            }}
        >
            <MuiButton
                className={`select_btn ${selections.length > 0 ? "active_filter" : "inactive_filter"}`}
                onClick={handleSubmit}
            >
                <span className='select_label'>{component?.label}{selections.length ? `(${selections.length})` : ''}</span>
                <ExpandMoreIcon className='expand_icon' />
            </MuiButton>
            {popupState && (
                <div className='dd_popup' onMouseEnter={() => setVisited(true)}>
                    {options.length > 10 && (
                        <div className='dd_search_box'>
                            <SearchIcon className='search_icon' />
                            <input type="text" className='dd_search_input' name={component.name} onInput={handleSearch} autoComplete="off" />
                        </div>
                    )}
                    {
                        showSearchResults ? (
                            searchResults?.map((option, index) => (
                                <div
                                    className='dd_item'
                                    onClick={() => handleChange(option)}
                                    key={index}
                                >
                                    <span className='dd_item_label'>{option.label}</span>
                                    {selections.includes(option.value) && <CheckIcon className='dd_item_check' />}
                                </div>
                            ))
                        ) : (
                            options.map((option, index) => (
                                <div
                                    className='dd_item'
                                    onClick={() => handleChange(option)}
                                    key={index}
                                >
                                    <span className='dd_item_label'>{option.label}</span>
                                    {selections.includes(option.value) && <CheckIcon className='dd_item_check' />}
                                </div>
                            ))
                        )
                    }
                </div>
            )}
        </div>
    );
};

export default DropSelect3;