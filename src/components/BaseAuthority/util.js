const ROLES = []
export const getRole = (auths, role) => {
  if (!auths) return false
  const list = typeof auths === 'string' ? auths.split(',') : auths
  return list.some(key => ROLES[key] === role)
}
