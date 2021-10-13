import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';

export function TranslatableInputComponent(props) {
    const {
        type,
        placeholder,
        label,
        onChangeValue,
        value,
        customStyle,
        fieldId,
        disabled,
        textareaSelectionStyle,
        textareaContainerStyle
    } = React.useMemo(() => (props), []);

    const classes = useStyles();
    const { languages } = useSelector((state) => state.languages);
    const [selectedLang, setSelectedLang] = useState('az');
    const [values, setValues] = useState({});

    useEffect(() => {
        setValuesMethod();
    }, [value]);

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
        onChangeValue(obj, selectedLang)
    }

    return (
        type === inputTypes.text ?
            <TextField
                disabled={disabled}
                label={label || ''}
                id={fieldId || (label + "-multi-lang-input")}
                placeholder={placeholder || ''}
                style={customStyle || classes.defaultStyle}
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
                <div style={textareaContainerStyle || { position: 'relative', marginTop: 20 }} className="form-group">
                    {label && <label>{label}</label>}
                    <span className={!textareaSelectionStyle ? classes.selectIcon : ""} style={textareaSelectionStyle || {}}>
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
                    style={classes.defaultStyle}
                />
    );
}

export const MemoizedTranslatableInput = memo((props) => {
    return <TranslatableInputComponent {...props} />
}, (prevProps, nextProps) => {
    if (prevProps.value === nextProps.value) {
        return true; // props are equal
    }
    return false; // props are not equal -> update the component
});

export const inputTypes = {
    text: 'text',
    textarea: 'textarea'
}

TranslatableInputComponent.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any.isRequired,
    onChangeValue: PropTypes.func,
    customStyle: PropTypes.object,
    fieldId: PropTypes.string,
    disabled: PropTypes.bool,
    textareaSelectionStyle: PropTypes.object,
    textareaContainerStyle: PropTypes.object
};


const useStyles = makeStyles(theme => ({
    defaultStyle: {
        width: '100%',
        flex: 1,
        marginTop: 8,
        marginBottom: 8
    },
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
