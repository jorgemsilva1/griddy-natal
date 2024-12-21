"use client";

import { Loading } from "@/components/loading";
import { useCallback, useState } from "react";
import styled from "styled-components";

// List of participants
const participants = [
  "Tiago Dias",
  "Cigz J",
  "Boeck",
  "Arda",
  "Velho",
  "Sousel",
  "Papá",
  "Mister Klopp",
  "Depay",
  "Bruno",
  "Bala",
];

export function Game() {
  const [gameConfig, setGameConfig] = useState({
    started: false,
    finished: false,
    initAnimation: false,
  });
  const [final, setFinal] = useState<
    Array<{ giver: string; receiver: string }>
  >([]);

  // Shuffle array helper function
  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Generate Secret Friend pairs
  function generateSecretFriend() {
    const givers = [...participants];
    const receivers = [...participants];

    let valid = false;

    while (!valid) {
      shuffleArray(receivers);
      valid = true;

      // Check if anyone is assigned to themselves
      for (let i = 0; i < givers.length; i++) {
        if (givers[i] === receivers[i]) {
          valid = false;
          break;
        }
      }
    }

    // Create pairs
    const pairs = givers.map((giver, index) => ({
      giver: giver,
      receiver: receivers[index],
    }));

    // Display the pairs
    console.log("Secret Friend Pairs:");
    pairs.forEach((pair) => {
      console.log(`${pair.giver} ⇝ ${pair.receiver}`);
    });

    setFinal(pairs);

    setTimeout(() => {
      setGameConfig((prev) => ({
        ...prev,
        finished: true,
      }));
    }, 5000);

    setTimeout(() => {
      setGameConfig((prev) => ({
        ...prev,
        initAnimation: true,
      }));
    }, 5500);
  }

  const handleClickButton = useCallback(() => {
    setGameConfig((prev) => ({
      ...prev,
      started: true,
    }));

    generateSecretFriend();
  }, []);

  return (
    <Container>
      {gameConfig.finished ? (
        <PairsContainer>
          <div className="content">
            {final.map((obj, i) => (
              <Text
                key={obj.giver}
                textDelay={800 * i}
                className={gameConfig.initAnimation ? `show show-${i}` : ""}
              >
                <span>{obj.giver}</span> ⇝ <span>{obj.receiver}</span>
              </Text>
            ))}
          </div>
        </PairsContainer>
      ) : (
        <>
          <Intro>
            <Logo className={gameConfig.started ? "disappear" : ""}>
              <img src="griddy.png" alt="griddy" />
            </Logo>
            <Button
              className={gameConfig.started ? "disappear" : ""}
              onClick={handleClickButton}
            >
              Sorteio Natal
            </Button>
          </Intro>

          <BarContainer className={gameConfig.started ? "show" : ""}>
            <Loading />
          </BarContainer>
        </>
      )}
    </Container>
  );
}

const Container = styled.main`
  width: 100dvw;
  height: 100dvh;
  border: 20px dashed black;
  background: #cf5006;
  display: grid;
  place-items: center;

  * {
    font-family: var(--font-josefin);
  }
`;

const PairsContainer = styled.section`
  width: 100%;
  height: 100%;
  border: 3px solid black;
  background: #cf5006;
  display: grid;
  place-items: center;
`;

const Text = styled.p<{ textDelay: number }>`
  color: black;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 24px;
  opacity: 0;
  transition: opacity 300ms ease-in-out ${({ textDelay }) => `${textDelay}ms`};

  &.show {
    opacity: 1;
  }

  span {
    display: inline-block;
    border: 3px dashed black;
    padding: 12px 6px 6px;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;

const Intro = styled.div`
  width: 100%;
  height: 100%;
  border: 3px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 24px;
`;

const Logo = styled.figure`
  transition: all 400ms ease-in-out 200ms;

  &.disappear {
    transform: scale(0);
    opacity: 0;
  }
`;

const Button = styled.button`
  font-size: 24px;
  background: black;
  color: white;
  border: transparent;
  border-radius: 4px;
  padding: 12px 24px 8px;
  cursor: pointer;
  text-transform: uppercase;

  transition: all 400ms ease-in-out;

  &.disappear {
    transform: translateY(30px);
    opacity: 0;
  }
`;

const BarContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &.show {
    .loading {
      transition: opacity 100ms ease-in-out 600ms;
      opacity: 1;

      .loading-bar {
        &:before {
          transform: scaleX(100%);
        }
      }
    }
  }
`;
