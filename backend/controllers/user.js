const prisma = require('../prisma/prisma');

exports.list = async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'eror' });
  }
};
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const updated = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username: username,
      },
    });
    res.send(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'eror' });
  }
};
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ msg: 'Deleted success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'eror' });
  }
};
