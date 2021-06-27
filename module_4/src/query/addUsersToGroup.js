import db from '../db/index.js';

export class AddUsersToGroupQuery {

  async addUsersToGroup(groupId, userId) {
    const { Group, User } = db.connection;

    const tx = await db.connection.sequelize.transaction();

    const [user, group] = await Promise.all([
      User.findOne({ where: { id: userId }, transaction: tx }),
      Group.findOne({ where: { id: groupId }, transaction: tx })]);

    if (!group || !user) {
      await tx.rollback();

      return {
        error: {
          title: 'Not found',
          description: `${!group ? 'Group' : 'User'} with id:${groupId} not found`,
        },
      };
    }

    const record = await user.addGroup(group);
    await tx.commit();

    const message = {
      info: {
        title: 'Already in current group',
        description: `User with id:${userId} already belong to group with id:${groupId}`,
      },
    };

    return record ? record : message;
  }

}

