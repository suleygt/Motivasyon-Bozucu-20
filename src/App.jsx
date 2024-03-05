import './styles.css'
import { useState, useEffect } from 'react'
//import showState from './utilities/showState'
import showState from './utilities/showState'
import NextQuoteButton from './components/NextQuoteButton'
import imageData from './data/imageData'
import quoteData from './data/quoteData'

export default function App() {
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    hydrateData();
  }, []);

  function hydrateData() {
    if (!currentData) {
      const newData = getNextData();
      setCurrentData(newData);
      showState(newData);
    }
  }

  function getNextData() {
    return {
      text: getRandomItem(quoteData),
      image: getRandomItem(imageData),
    };
  }

  function getRandomItem(targetObject) {
    checkArray(targetObject);
    const targetArray = targetObject.availableItems;
    const length = targetArray.length;
    const randomIndex = Math.floor(Math.random() * length);
    const targetItem = targetArray[randomIndex];
    targetArray.splice(randomIndex, 1);
    targetObject.usedItems.push(targetItem);
    return targetItem;
  }

  function getNextQuote() {
    setCurrentData(getNextData());
  }

  function checkArray(targetObject) {
    if (targetObject.availableItems.length === 0) {
      targetObject.availableItems = [...targetObject.usedItems];
      targetObject.usedItems = [];
    }
  }

  function getSmallestFontSize(fontObjectOne, fontObjectTwo) {
    const fontSizeOneString = fontObjectOne && fontObjectOne.fontSize;
    const fontSizeTwoString = fontObjectTwo && fontObjectTwo.fontSize;

    if (!fontSizeOneString && !fontSizeTwoString) {
      return undefined;
    } else if (fontSizeOneString && !fontSizeTwoString) {
      return fontObjectOne;
    } else if (!fontSizeOneString && fontSizeTwoString) {
      return fontObjectTwo;
    }

    const fontSizeOneNum = getNumber(fontSizeOneString);
    const fontSizeTwoNum = getNumber(fontSizeTwoString);

    function getNumber(fontSizeString) {
      return +fontSizeString.slice(0, -2);
    }

    return fontSizeOneNum < fontSizeTwoNum ? fontObjectOne : fontObjectTwo;
  }

  return (
    <div className="wrapper" style={currentData && currentData.image.wrapperStyles}>
      {currentData && (
        <div className="quote-container" style={currentData && currentData.image.containerStyles}>
          <p className="quote" style={getSmallestFontSize(currentData.image.quoteFontSize, currentData.text.quoteFontSize)}>
            {currentData.text.fakeQuote}
            <span className="source">-{currentData.text.fakeSource}</span>
          </p>
        </div>
      )}
      <NextQuoteButton clickHandler={getNextQuote} />
    </div>
  );
}