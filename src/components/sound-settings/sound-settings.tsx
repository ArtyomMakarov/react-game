import React, {ChangeEvent, useEffect, useState} from 'react';
import './sound-settings.scss';
import Form from 'react-bootstrap/Form';
import useSound from 'use-sound';
import snakeMusic from '../../assets/audio/snakeMusic.mp3';
import { CommonConstants } from "../../constants/constants";


export interface ISoundSettingsProps {
  snakeSoundVolume: (level: number) =>void;
  isSnakeSoundSwitch: (scale: boolean) => void;
}

export default function SoundSettings(props: ISoundSettingsProps) {

  const [isMusicSwitchOn, setMusicIsSwitchOn] = useState(false);
  const [isSoundSwitchOn, setSoundIsSwitchOn] = useState(false);
  const [snakeMusicVolume, setSnakeMusicVolume] = useState(CommonConstants.SNAKE_SOUND_VOLUME);
  const [playSnakeMusic, snakeMusicOptions ] = useSound(
    snakeMusic,
    {
      volume: snakeMusicVolume
    }
  );

  useEffect(() => {
    isMusicSwitchOn ? playSnakeMusic() : snakeMusicOptions.pause();
  },[isMusicSwitchOn]);

  useEffect(() => {
    props.isSnakeSoundSwitch(isSoundSwitchOn);
  },[isSoundSwitchOn]);


  const onMusicSwitchAction = () => {
    setMusicIsSwitchOn(!isMusicSwitchOn);

  };

  const onSoundSwitchAction = () => {
    setSoundIsSwitchOn(!isSoundSwitchOn);
  };

  const onMusicControlAction = (e: ChangeEvent<HTMLInputElement>) => {
    setSnakeMusicVolume(+e.target.value);
  };

  const onSoundControlAction = (e: ChangeEvent<HTMLInputElement>) => {
    props.snakeSoundVolume(+e.target.value);
  };

  return (
    <div className="sound-settings">
        <Form.Check
          type='checkbox'
          onChange={onMusicSwitchAction}
          inline
          id="custom-switch"
          label="Music On/Off"
          checked={isMusicSwitchOn}
        />
        <Form.Group controlId="formBasicRange">
          <Form.Label>Music Volume</Form.Label>
          <Form.Control type="range" onChange={onMusicControlAction} min='0' max='1' step='0.1' />
        </Form.Group>
        <Form.Check
          type='checkbox'
          onChange={onSoundSwitchAction}
          inline
          id="custom-switch"
          label="Game Sound On/Off"
          checked={isSoundSwitchOn}
        />
        <Form.Group controlId="formBasicRange">
          <Form.Label>Sound Volume</Form.Label>
          <Form.Control type="range" onChange={onSoundControlAction} min='0' max='1' step='0.1'/>
        </Form.Group>
      </div>
  );
}

