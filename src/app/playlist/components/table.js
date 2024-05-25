"use client";

import React, { useEffect, useState } from "react";

import { Button, Dropdown } from "antd";

import {
  ClockCircleOutlined,
  PlusOutlined,
  CalendarOutlined,
  EllipsisOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";

// api
import playlistApi from "../../../../api/playlist";

export default function Table(props) {
  const { playList, setIsModalOpen, setIdDelete } = props;

  const items = [
    {
      key: "1",
      label: <span>Delete</span>,
    },
  ];

  const onDelete = () => {
    setIsModalOpen(true);
  };

  const onClickDelete = (id) => {
    setIdDelete(id);
  };

  const calculateMinute = (second) => {
    let newTime = (second / 60).toString().substring(0, 4);

    newTime = newTime.replace(/[.]/g, ":");

    if (newTime.length === 1) {
      newTime = newTime + ":00";
    }
    if (newTime.length === 3) {
      newTime = newTime + "0";
    }

    return newTime;
  };

  return (
    <div className="wrapper_table">
      <table className="table_playlist">
        <thead>
          <tr>
            <th></th>
            <th>TITLE</th>
            <th>ARTIST</th>
            <th>ALBUM</th>
            <th>
              <CalendarOutlined />
            </th>
            <th>
              <div>
                <ClockCircleOutlined />
              </div>
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody className="body_table_playlist">
          {playList?.playlistItems?.map((data, index) => (
            <tr key={index} className="wrapper_row">
              <td className="text_end">
                {data.playing ? (
                  <CheckOutlined className="pointer" />
                ) : (
                  <PlusOutlined className="pointer" />
                )}
              </td>
              <td className="txt_white">{data.music.title}</td>
              <td className="txt_white">{data.music.artist}</td>
              <td className="txt_white">{data.music.album}</td>
              <td>{dayjs(data.createdAt).format("YYYY-MM-DD")}</td>
              <td className="text_end">{calculateMinute(data.music.length)}</td>
              <td>
                <Dropdown
                  menu={{
                    items,
                    onClick: (data) => onDelete(data),
                  }}
                  placement="bottomLeft"
                  // overlayClassName="dropdown_more"
                >
                  <Button
                    shape="circle"
                    size="small"
                    onClick={() => onClickDelete(data.id)}
                    icon={<EllipsisOutlined />}
                    className="btn_action"
                  ></Button>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {playList.playlistItems?.length < 1 ? (
        <div className="empty">Empty Playlist...</div>
      ) : null}
    </div>
  );
}
