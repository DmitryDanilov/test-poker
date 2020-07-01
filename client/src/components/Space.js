import React, { useContext } from 'react'
import Context from '../context'

const Space = (props) => {
  const { space, playerSpaceId } = props
  const { toggleSpace } = useContext(Context)
  return (
    <div className="space">
      <table>
        <tbody>
          <tr>
            <td>свободно?</td>
            <td>{space.isEmpty ? "да" : "нет"}</td>
          </tr>
          <tr>
            <td>name</td>
            <td>{space.name}</td>
          </tr>
          <tr>
            <td>cash</td>
            <td>{space.cash}</td>
          </tr>
          <tr>
            <td>blind</td>
            <td>{space.blind}</td>
          </tr>
          <tr>
            <td>rate</td>
            <td>{space.rate}</td>
          </tr>
          <tr>
            <td></td>
            <td>{!space.isEmpty && space.id === playerSpaceId ? 'сижу здесь' : ''}</td>
          </tr>
        </tbody>
      </table>
      <button
        className={space.isEmpty ? 'backgroundGreen' : 'backgroundRed'}
        id={space.id}
        onClick={toggleSpace.bind(null, space.id)}
      >
        {space.isEmpty ? "Сесть" : "Встать"}
      </button>
    </div>
  )
}

export default Space
