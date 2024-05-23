"use client";

import React, { useEffect, useState } from "react";

// material ui
import { Button, Input, Dropdown } from "antd";

import { styled } from "@mui/material/styles";
import { Switch } from "@mui/material";

import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";

// compoentns
import Table from "./components/table";

export default function Playlist() {
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

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
            <div className="txt_diving txt_white">Driving</div>
            <div className="txt_detail">Pop jams for the car</div>
            <div className="txt_detail">
              Create by <span className="txt_white">Singto</span> · 22 songs, 1
              hr 38 min
            </div>
            <div className="wrapper_btn txt_detail">
              <div className="wrapper_btn_play">
                <Button className="btn_play">PLAY</Button>

                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomLeft"
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
          <Input
            className="box_input"
            size="large"
            placeholder="Filter"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="wrapper_switch_download">
          Download{" "}
          <IOSSwitch
            sx={{ m: 1 }}
            // checked={checked}
            // onChange={({ target: { checked } }) => setChecked(checked)}
          />
        </div>
      </div>
      <Table />
    </>
  );
}
