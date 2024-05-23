import {
  ClockCircleOutlined,
  PlusOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

export default function Table() {
  const mockupLoop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

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
          </tr>
        </thead>

        <tbody className="body_table_playlist">
          {mockupLoop.map((data, index) => (
            <tr key={index} className="wrapper_row">
              <td className="text_end">
                <PlusOutlined className="pointer" />
              </td>
              <td className="txt_white">Shut Up and Dance</td>
              <td className="txt_white">Neon Trees</td>
              <td className="txt_white">TALKING IS HARD</td>
              <td>2015-08-09</td>
              <td className="text_end">3:19</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
