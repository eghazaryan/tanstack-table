import { TextInput, Progress as MantineProgress, Container, Text } from '@mantine/core';
import { useEffect, useState, useRef } from 'react';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import classes from './FloatingIndicator.module.css';

function Progress({ value, left }: { value: number; left: number }) {
  console.log(left);
  return <MantineProgress value={value} size="xl" className={classes.progress} />;
}

function Count({ length }: { length: number }) {
  return <Text className={classes.count}>{length} / 10</Text>;
}

export function FloatingIndicator() {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const [caretLeft, setCaretLeft] = useState('0px');
  const inputRef = useRef(null);

  // Function to calculate the caret position
  const updateCaretPosition = () => {
    if (inputRef.current) {
      const caretPosition = inputRef.current.selectionStart;
      const textBeforeCaret = inputRef.current.value.substring(0, caretPosition);
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.whiteSpace = 'pre';
      span.textContent = textBeforeCaret;
      document.body.appendChild(span);
      setCaretLeft(`${span.offsetWidth}px`);
      document.body.removeChild(span);
    }
  };

  useEffect(() => {
    const input = inputRef.current;
    input.addEventListener('click', updateCaretPosition);
    input.addEventListener('keyup', updateCaretPosition);

    return () => {
      input.removeEventListener('click', updateCaretPosition);
      input.removeEventListener('keyup', updateCaretPosition);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Container size="xs" pt="xl" className={classes.inner}>
        <Count length={value.length} />
        <TextInput
          ref={inputRef}
          classNames={{ input: classes.input, label: classes.label }}
          data-focused={isFocused}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          radius="md"
          size="md"
          label="Username"
          maxLength={10}
          onChange={(event) => setValue(event.currentTarget.value)}
          rightSection={value.length === 10 ? <IconCircleCheckFilled color="#228be6" /> : null}
        />
      </Container>
      <Progress value={value.length * 10} left={caretLeft} />
    </div>
  );
}
