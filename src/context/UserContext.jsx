import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userIdentified, setuserIdentified] = useState(false)
  

  return (
    <UserContext.Provider value={{ user, setUser , userIdentified, setuserIdentified }}>
      {children}
    </UserContext.Provider>
  )
}
