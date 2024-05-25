"use client";

import React, { useEffect, useState } from "react";

// material ui
import { Button, Input, Dropdown } from "antd";
import {
  EllipsisOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";

// api
import musicApi from "../../../api/music";
import playlistApi from "../../../api/playlist";

// compoentns
import Table from "./components/table";
import Switch from "./components/switch";
import ModalConfirm from "./components/modalConfirm";

export default function Playlist() {
  const items = [
    {
      key: "1",
      label: <span>Go to Playlist Radio</span>,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <span>Collaborative Playlist</span>,
    },
    {
      key: "3",
      label: <span>Make Secret</span>,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: <span>Edit Details</span>,
    },
    {
      key: "5",
      label: <span>Report</span>,
      disabled: true,
    },
    {
      key: "6",
      label: <span>Delete</span>,
    },
    {
      type: "divider",
    },
    {
      key: "7",
      label: <span>Create Similar Playlist</span>,
    },
    {
      key: "8",
      label: <span>Download</span>,
    },
    {
      key: "9",
      label: <span>Share</span>,
    },
  ];

  const [checked, setChecked] = useState(false);
  const [dropdownTrigger, setDropdownTrigger] = useState(false);

  // for get playlist
  const [payload, setPayload] = useState({ search: "" });
  const [isSearch, setIsSearch] = useState(false);

  const [musicList, setMusicList] = useState([]);
  const [playList, setPlayList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setIsModalInfo] = useState({
    text: "Do you want to delete this music ?",
  });

  const [idDelete, setIdDelete] = useState("");

  useEffect(() => {
    getPlaylist();
  }, []);

  useEffect(() => {
    if (isSearch) {
      getOneMusic();
    }
  }, [isSearch]);

  const getPlaylist = () => {
    playlistApi.getOne(1).then((response) => {
      if (response.response_code === "200") {
        setPlayList(response.data);
      }
    });
  };

  const getOneMusic = () => {
    musicApi.searchMusic(payload).then((response) => {
      if (response.response_code === "200") {
        const newResponse = response.data.map((data) => ({
          length: data.length,
          key: data.id,
          label: (
            <div>
              <div className="j_between item_music_top">
                <div className="txt_white">{data.title}</div>
                {/* <Button
                  shape="circle"
                  size="small"
                  color="green"
                  icon={<PlusOutlined className="pointer" />}
                ></Button> */}
              </div>
              <div className="j_between item_music_bottom">
                <div>{data.artist}</div>
                <div>{data.album}</div>
              </div>
            </div>
          ),
        }));

        setMusicList(newResponse);
        setIsSearch(false);

        setDropdownTrigger(true);
      } else {
        setDropdownTrigger(false);
      }
    });
  };

  const onFilterChange = (value) => {
    setPayload({ search: value });
    setIsSearch(true);
  };

  const onSelectMusic = (e) => {
    addMusicToPlaylist(e.key);
  };

  const addMusicToPlaylist = (musicId) => {
    const newPayload = {
      musicId: musicId,
      playlistId: playList.id,
      playing: false,
    };

    playlistApi.createPlaylistItem(newPayload).then((response) => {
      if (response.response_code === "200") {
        updatePlaylist(musicId);
      }
    });
  };

  const updatePlaylist = (musicId) => {
    const newPayload = {
      total: playList.total + 1,
      longTerm: playList.longTerm + calculateTime(musicId),
    };

    playlistApi.update(playList.id, newPayload).then((response) => {
      if (response.response_code === "200") {
        getPlaylist();
      }
    });
  };

  const calculateTime = (musicId) => {
    const findMusic = musicList.find((data) => data.key == musicId);

    return parseFloat(findMusic.length);
  };

  const calculateHour = (second) => {
    let secToMin = parseInt(second) / 60;

    let hours = Math.floor(secToMin / 60);
    let minutes = (secToMin % 60).toString().substring(0, 2);

    if (minutes.length === 1) {
      minutes = minutes + "0";
    }

    return `${hours} hr ${minutes} min`;
  };

  const submitConfirmModal = () => {
    playlistApi.removePlaylistItem(idDelete).then((response) => {
      if (response.response_code === "200") {
        setIsModalOpen(false);
        getPlaylist();
      }
    });
  };

  return (
    <>
      {/* card */}
      <div className="wrapper_playlist">
        <div className="column">
          <img
            className="img_playlist"
            src="https://www.techhub.in.th/wp-content/uploads/2021/04/169985545_10159648065601995_6223492693175529429_n-1024x1024.png"
          />
          <div className="box_detail">
            <div className="txt_detail txt_white">PLAYLIST</div>
            <div className="txt_diving txt_white">{playList.title}</div>
            <div className="txt_detail">{playList.description}</div>
            <div className="txt_detail">
              Create by <span className="txt_white">{playList.createBy}</span> ·{" "}
              {playList.total} songs, {calculateHour(playList.longTerm)}
            </div>
            <div className="wrapper_btn txt_detail">
              <div className="wrapper_btn_play">
                <Button className="btn_play">PLAY</Button>

                <Dropdown
                  menu={{
                    items,
                  }}
                  // trigger={["dropdownTrigger", "click", "hover"]}
                  placement="bottomLeft"
                  overlayClassName="dropdown_more"
                >
                  <Button
                    shape="circle"
                    icon={<EllipsisOutlined />}
                    className="btn_more"
                  ></Button>
                </Dropdown>
              </div>

              <div className="text_end">
                <div>FOLLOWERS</div>
                <div>0</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="wrapper_filter">
        <div className="wrapper_filter_input">
          <Dropdown
            overlayClassName="dropdown_search"
            menu={{
              items: musicList,
              onClick: onSelectMusic,
            }}
          >
            <Input
              className="box_input"
              size="large"
              placeholder="Filter"
              prefix={<SearchOutlined />}
              onChange={(event) => onFilterChange(event.target.value)}
            />
          </Dropdown>
        </div>
        <div className="wrapper_switch_download">
          Download <Switch />
        </div>
      </div>
      <Table
        playList={playList}
        getPlaylist={getPlaylist}
        setIsModalOpen={setIsModalOpen}
        setIdDelete={setIdDelete}
      />
      <ModalConfirm
        isModalOpen={isModalOpen}
        modalInfo={modalInfo}
        submitConfirmModal={submitConfirmModal}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
