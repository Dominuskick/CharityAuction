import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import styles from './index.module.css';
import { useParams } from 'react-router';
import { Button } from '..';

const index = () => {
  const { lotId } = useParams();
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('BetOnGoodness-token');
      console.log(`token: ${token}`);
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://api20240210143725.azurewebsites.net/bidHub', {
          accessTokenFactory: () => token,
        }) // Замените на адрес вашего SignalR хаба
        .configureLogging(signalR.LogLevel.Information)
        .build();

      console.log(newConnection);

      setConnection(newConnection);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (connection) {
      // console.log('lotId: ', lotId);
      connection
        .start()
        .then(() => connection.invoke('Setup', lotId))
        .catch((err) =>
          console.error('Error during connection establishment:', err)
        );

      connection.on('ReceiveMessage', (data) => {
        console.log(`!!!ReceiveMessage!!! ${data}`);
        console.log(data);
      });

      return () => {
        connection.stop();
      };
    }
  }, [connection]);

  const createBid = () => {
    const amount = 2000;

    connection
      .invoke('CreateBidAsync', amount, lotId)
      .then((data) => console.log('SUCCESS: ', data))
      .catch((e) => console.error('Error during bid creation:', e));
  };

  return (
    <div>
      <Button onClick={createBid}>СДЕЛАТЬ СТАВКУ</Button>
    </div>
  );
};

export default index;
