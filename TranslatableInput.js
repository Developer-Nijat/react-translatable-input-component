import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

const defaultStyle = {
    width: '100%',
    flex: 1,
    marginTop: 8,
    marginBottom: 8
}

const useStyles = makeStyles(theme => ({
    selectIcon: {
        position: 'absolute',
        fontSize: 14,
        fontWeight: 500,
        left: 5,
        top: 35,
        zIndex: 3,
        cursor: 'pointer',
        padding: 5
    }
}));

export function TranslatableInputComponent(props) {
    const {
        type,
        placeholder,
        label,
        onChangeValue,
        value,
        customStyle,
        fieldId,
        disabled
    } = props;

    const classes = useStyles();
    const { languages } = useSelector((state) => state.languages);
    const [selectedLang, setSelectedLang] = useState('az');
    const [values, setValues] = useState({});

    useEffect(() => {
        setValuesMethod()
    }, []);

    function setValuesMethod() {
        if (value) {
            setValues(value);
        } else {
            if (languages && languages.length) {
                let obj = { ...values };
                languages.forEach(element => {
                    obj[element.code] = "";
                });
                setValues(obj);
            }
        }
    }

    function handleLanguageChange(lang) {
        setSelectedLang(lang)
    }

    function handleValueChange(value) {
        let obj = { ...values };
        obj[selectedLang] = value;
        setValues(obj);
        onChangeValue(obj)
    }

    return (
        type === inputTypes.text ?
            <TextField
                disabled={disabled}
                label={label || 'label'}
                id={fieldId || (label + "-multi-lang-input")}
                placeholder={placeholder || ''}
                style={customStyle || defaultStyle}
                value={values[selectedLang] || ''}
                onChange={(e) => handleValueChange(e.target.value)}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <Select
                            value={selectedLang || 'az'}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            inputProps={{
                                name: 'multi-lang-input-select',
                                id: 'multi-lang-input-select',
                            }}
                        >
                            {
                                languages &&
                                    languages.length ?
                                    languages.map((item, i) => (
                                        <MenuItem
                                            value={item.code}
                                            key={i}>
                                            {item.code}
                                        </MenuItem>
                                    )) :
                                    <MenuItem value={'az'}>{'az'}</MenuItem>
                            }
                        </Select>
                    </InputAdornment>
                }}
            /> :
            type === inputTypes.textarea ?
                <div style={{ position: 'relative', marginTop: 20 }} className="form-group">
                    <label>{label || 'label'}</label>
                    <span className={classes.selectIcon}>
                        <InputAdornment position="start">
                            <Select
                                value={selectedLang || 'az'}
                                onChange={(e) => handleLanguageChange(e.target.value)}
                                inputProps={{
                                    name: 'multi-lang-textarea-select',
                                    id: 'multi-lang-textarea-select',
                                }}
                            >
                                {
                                    languages &&
                                        languages.length ?
                                        languages.map((item, i) => (
                                            <MenuItem
                                                value={item.code}
                                                key={i}>
                                                {item.code}
                                            </MenuItem>
                                        )) :
                                        <MenuItem value={'az'}>{'az'}</MenuItem>
                                }
                            </Select>
                        </InputAdornment>
                    </span>
                    <textarea
                        className="form-control"
                        placeholder={placeholder || ''}
                        id={fieldId || (label + "-multi-lang-textarea")}
                        rows="4"
                        style={customStyle || { paddingTop: 30 }}
                        value={values[selectedLang] || ''}
                        onChange={(e) => handleValueChange(e.target.value)}
                        disabled={disabled}
                    ></textarea>
                </div> :
                <TextField
                    disabled
                    value="Type is not defined"
                    style={defaultStyle}
                />
    );
}

TranslatableInputComponent.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any.isRequired,
    onChangeValue: PropTypes.func,
    customStyle: PropTypes.object,
    fieldId: PropTypes.string,
    disabled: PropTypes.bool
};

export const inputTypes = {
    text: 'text',
    textarea: 'textarea'
}