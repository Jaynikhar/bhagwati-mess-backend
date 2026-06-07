import Menu from "../models/Menu.js";


export const createOrUpdateMenu = async (req, res) => {
  try {
    const { day, night } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let menu = await Menu.findOne({ date: today });

    if (menu) {
      menu.day = day;
      menu.night = night;
      menu.updatedBy = req.user.id;
      await menu.save();
    } else {
      menu = await Menu.create({
        date: today,
        day,
        night,
        updatedBy: req.user.id,
      });
    }

    res.json({ message: "Menu updated", menu });
  } catch (error) {
    console.log("Menu update error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



export const getTodayMenu = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const menu = await Menu.findOne({ date: today });

    // if no menu exists → default menu
    if (!menu) {
      return res.json({
        day: "Rice, Dal, Chapati, Seasonal Sabji",
        night: "Rice, Dal, Chapati, Special Sabji",
      });
    }

    // convert structured menu to readable text
    const dayText = `
      Rice: ${menu.day.rice}
      Dal: ${menu.day.pulse}
      Sabji: ${menu.day.veggie}
      Special: ${menu.day.special}
    `;

    const nightText = `
      Rice: ${menu.night.rice}
      Dal: ${menu.night.pulse}
      Sabji: ${menu.night.veggie}
      Special: ${menu.night.special}
    `;

    res.json({
      day: dayText,
      night: nightText,
    });

  } catch (error) {
    console.log("Menu fetch error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
