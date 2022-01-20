import { Context } from '../../context/store';
import { useContext, useLayoutEffect, useState } from 'react';
import { useHeight } from '../../utils/layout';
import ButtonBase from '../buttonBase/ButtonBase';

const Dropdown = (props: any) => {
  const [store] = useContext(Context);

  const { translations } = store;

  const [isVisible, setVisible] = useState(false);
  const [layout, setLayout] = useState<any>({ x: null, y: null });

  const height = useHeight();

  const handleClick = (e: any) => {
    const { x, y } = e.nativeEvent;

    setLayout({ x, y });
    setVisible(true);
  };

  const getStyle = () => {
    if (layout.x) {
      return {
        left: layout.x,
        top: layout.y,
        maxWidth: 300,
        maxHeight: height - 24,
        minWidth: 120,
        height: 'auto',
        overflowX: 'hidden',
        overflowY: 'auto',
      };
    }
  };

  // Correct layout
  useLayoutEffect(() => {
    if (isVisible) {
      const element: any = document.getElementById(
        'Kalend__Dropdown__container'
      );
      if (element) {
        let newX = layout.x;
        let newY = layout.y;

        if (element.offsetHeight + layout.y > window.innerHeight) {
          newY = layout.y - element.offsetHeight;
        }
        if (element.offsetWidth + layout.x > window.innerWidth) {
          newX = layout.x - element.offsetWidth;
        }

        setLayout({
          x: newX,
          y: newY,
        });
      }
    }
  }, [
    isVisible,
    document.getElementsByClassName('Kalend__Dropdown__container'),
  ]);

  const style: any = getStyle();

  return (
    <>
      <ButtonBase
        className={'Kalend__Monthview_Event'}
        style={{
          width: props.width,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 20,
        }}
        onClick={handleClick}
        isDark={false}
      >
        <p className={'Kalend__text'} style={{ fontSize: 11 }}>
          {translations['buttons']['showMore']}
        </p>
      </ButtonBase>
      {isVisible ? (
        <div
          className={'Kalend__Dropdown__backdrop'}
          onClick={() => setVisible(false)}
        >
          <div
            className={'Kalend__Dropdown__container'}
            id="Kalend__Dropdown__container"
            style={style}
          >
            {props.children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Dropdown;
