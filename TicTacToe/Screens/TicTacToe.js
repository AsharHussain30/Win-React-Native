import {View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import React, {useState} from 'react';
import WebView from 'react-native-webview';

const TicTacToe = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [check7, setCheck7] = useState(false);
  const [check8, setCheck8] = useState(false);
  const [check9, setCheck9] = useState(false);

  const [playerswitch, setPlayerSwitch] = useState({
    cp: 1,
    board: Array(9).fill(null),
  });
  const [player1Turn, setPlayer1Turn] = useState(false);
  const [player2Turn, setPlayer2Turn] = useState(!player2Turn);

  const {cp, board} = playerswitch;

  const renderBox = index => {
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          height: '33.3%',
          borderWidth: 2,
          borderColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        disabled={board[index] !== null}
        onPress={() => {
          setCheck1(true);
          if (board[index] === null) {
            const newBoard = [...board];
            newBoard[index] = cp === 1 ? 'X' : 'O';

            setPlayerSwitch({
              board: newBoard,
              cp: cp === 1 ? 2 : 1,
            });
          }
        }}>
        <Text style={{fontSize: 55, color: 'white'}}>
          {/* {check1 == true ? (playerswitch.cp === 1 ? 'X' : 'O') : null} */}
          {board[index]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text
        style={{
          position: 'absolute',
          top: 10,
          fontWeight: '700',
          color: 'gray',
        }}>
        Tic Tac Toe
      </Text>
      <View
        style={{
          height: '60%',
          width: '95%',
          borderColor: 'black',
          borderWidth: 2,
          backgroundColor: 'teal',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}>
        <View style={{flex: 1}}>
          {renderBox(0)}
          {renderBox(1)}
          {renderBox(2)}
        </View>
        <View style={{flex: 1}}>
          {renderBox(3)}
          {renderBox(4)}
          {renderBox(5)}
        </View>
        <View style={{flex: 1}}>
          {renderBox(6)}
          {renderBox(7)}
          {renderBox(8)}
        </View>
      </View>
    </View>
  );
};

export default TicTacToe;
