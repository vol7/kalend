import React, { useState } from 'react';

import { ButtonIconProps } from './ButtonIcon.props';
import { parseCssDark } from '../../utils/common';

const ButtonIcon = (props: ButtonIconProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const {
    children,
    onClick,
    size,
    disabled,
    isDark,
    iconSize,
    noActive,
    backdropClassName,
    style,
  } = props;

  const handleTouchStart = (): void => setIsPressed(true);

  const handleTouchOff = (e: any): void => setIsPressed(false);

  const containerClassName: string = !size
    ? 'Calend__ButtonIcon__container'
    : `Calend__ButtonIcon__container-${size}`;

  const backdropClassNameString: string = backdropClassName
    ? backdropClassName
    : 'Calend__ButtonIcon__backdrop';

  const buttonClassName: string = noActive
    ? `${
        disabled ? 'Calend__ButtonIcon__disabled ' : ''
      }Calend__ButtonIcon-inactive`
    : `${disabled ? 'Calend__ButtonIcon__disabled ' : ''}Calend__ButtonIcon`;

  const IconElement: any = React.cloneElement(children, {
    className: `Calend__ButtonIcon__svg${
      iconSize ? `-${iconSize}` : '-normal'
    }`,
  });

  return (
    <div className={containerClassName} style={style}>
      <button
        className={parseCssDark(buttonClassName, isDark)}
        onClick={onClick}
        disabled={disabled}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchOff}
      >
        {IconElement}
        {isPressed ? <div className={backdropClassNameString} /> : null}
      </button>
    </div>
  );
};

export default ButtonIcon;
