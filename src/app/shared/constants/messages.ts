export const Messages = {
  LOGIN: {
    SUCCESS: 'Login successful!',
    ERROR: 'Invalid email or password',
  },
  REGISTER: {
    SUCCESS: 'Registration successful!',
    ERROR: 'Registration failed. Please try again.',
  },
  AUTH: {
    SESSION_EXPIRED: 'Session expired. Please log in again.',
    UNAUTHORIZED: 'You are not authorized to access this page.',
  },
  ADMIN: {
    LIST_ERROR: 'Failed to load admins',
    DETAIL_ERROR: 'Failed to load admin detail',
    ACTIVATE_ERROR: 'Failed to activate admin',
    DEACTIVATE_ERROR: 'Failed to deactivate admin',
    LIST_CAPTION: 'Admin users list',
    EMPTY_LIST: 'No admins found.',
    TABLE_HEADERS: {
      ADMIN_ID: 'Admin ID',
      USERNAME: 'Username',
      EMAIL: 'Email',
      PHONE_NUMBER: 'Phone Number',
      ROLE: 'Role',
      STATUS: 'Status',
    },
  },
  DRIVER: {
    DETAIL_ERROR: 'Failed to load driver details',
    LIST_CAPTION: 'Driver users list',
    EMPTY_LIST: 'No drivers found.',
    TABLE_HEADERS: {
      DRIVER_ID: 'Driver ID',
      PHONE_NUMBER: 'Phone Number',
      STATUS: 'Status',
    },
  },
  USER: {
    LIST_ERROR: 'Failed to load users',
  },
  // Add other page or feature messages here
};
