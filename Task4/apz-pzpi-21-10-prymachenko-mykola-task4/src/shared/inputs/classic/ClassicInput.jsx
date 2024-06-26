'use client';
import React, {memo, useEffect, useMemo, useState} from 'react';
import styles from './classic-input.module.scss';
import * as uuid from 'uuid';
const ClassicInput = memo(({
                          children,
                          value,
                          setValue,
                          minValue,
                          maxValue,
                          type,
                          placeholder,
                          py, px,
                               style,
                               inputStyle,
                      }) => {
    const [id, setId] = useState('')
    useEffect(() => {
        setId(uuid.v4());
    }, []);
    return (
        <div className={styles.input__wrapper}
             style={style}
        >
            <input
                id={id}
                type={type ?? 'text'}
                min={minValue}
                max={maxValue}
                className={styles.input}
                placeholder={placeholder ?? ''}
                value={value}
                onChange={(e) => setValue(e.target.value, children)}
                style={{
                    paddingTop: py,
                    paddingBottom: py,
                    paddingLeft: px,
                    paddingRight: px,
                    ...inputStyle
                }}
            />
            <label htmlFor={id} className={styles.label}>{children}</label>
        </div>
    );
});

ClassicInput.displayName = 'ClassicInput';

export default ClassicInput;