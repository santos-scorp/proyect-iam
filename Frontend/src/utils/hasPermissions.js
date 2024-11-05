
export const hasPermissions = (requiredPermissions, userPermissions) => {
    
    let array = Object.keys(userPermissions)
    try {
        console.log(array);
        if (requiredPermissions) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error);
        
    }
  }