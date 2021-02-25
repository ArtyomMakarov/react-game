import React, {useEffect, useState} from 'react';
import './sound-settings.scss';
import useSound from 'use-sound';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
// import snakeMusic from '../../assets/audio/snakeMusic.mp3';

export default function SoundSettings() {
  const [isMusicSwitchOn, setMusicIsSwitchOn] = useState(false);
  const [isSoundSwitchOn, setSoundIsSwitchOn] = useState(false);

  const audioTune = new Audio('<../../assets/audio/snakeMusic.mp3>');

  useEffect(() => {
    audioTune.loop = true
  });

  const onMusicSwitchAction = () => {
    audioTune.play();
    setMusicIsSwitchOn(!isMusicSwitchOn);
  };

  const onSoundSwitchAction = () => {
    setSoundIsSwitchOn(!isSoundSwitchOn);
  };

  const onMusicControlAction = () => {
  };

  const onSoundControlAction = () => {
  };

  return (
    <div className="sound-settings">
      <Form>
        <Form.Check
          type='checkbox'
          onChange={onMusicSwitchAction}
          inline
          id="custom-switch"
          label="Music On/Off"
          checked={isMusicSwitchOn}
        />
        <Form.Check
          type='checkbox'
          onChange={onSoundSwitchAction}
          inline
          id="custom-switch"
          label="Game Sound On/Off"
          checked={isSoundSwitchOn}
        />
        <Form.Group controlId="formBasicRange">
          <Form.Label>Music Volume</Form.Label>
          <Form.Control type="range" onChange={onMusicControlAction}/>
        </Form.Group>
        <Form.Group controlId="formBasicRange">
          <Form.Label>Sound Volume</Form.Label>
          <Form.Control type="range" onChange={onSoundControlAction}/>
        </Form.Group>
      </Form>
    </div>
  );
}

