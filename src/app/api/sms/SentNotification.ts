import { DataTypes } from 'sequelize';
import { sequelize } from '@/lib/sequelize';

export const SentNotification = sequelize.define('sent_notification', {
  subject: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  receiver: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM('EMAIL', 'SMS'),
    allowNull: false,
    defaultValue: 'EMAIL',
  },
  follow_up_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  follow_up_days: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  paranoid: true,     // enables soft deletes (adds deletedAt column)
  timestamps: true,   // adds createdAt and updatedAt columns
});
