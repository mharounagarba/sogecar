// src/components/Icon.jsx
import * as Md from 'react-icons/md'
import * as Fa from 'react-icons/fa'
import * as Ai from 'react-icons/ai'
import * as Bi from 'react-icons/bi'

import './Icon.css'

const libraries = { Md, Fa, Ai, Bi }

export default function Icon({ lib = 'Md', name, size = 20, color = 'inherit', ...props }) {
  const IconPack = libraries[lib] || Md
  const Tag = IconPack[name]
  return Tag ? <Tag size={size} color={color} {...props} /> : <span>❓</span>
}


// import Icon from '../components/Icon'

// export default function Exemple() {
//   return (
//     <div style={{ display: 'flex', gap: '1rem' }}>
//       <Icon name="MdDashboard" color="#2196f3" size={24} />
//       <Icon lib="Fa" name="FaUser" color="green" size={24} />
//       <Icon lib="Ai" name="AiFillPrinter" color="orange" />
{/* <Icon name="MdDelete" color="red" className="icon" /> */}

//     </div>
//   )
// }
