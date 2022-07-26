const { Op } = require("sequelize");

async function getMany(seqObj, filter, list) {
    // list.push(seqObj)
    const getManyList = filter.replace(/["]/g, "").replace(/[\]\[]/g, "").replace("{", "").replace("}", "").split(":");
    const requestedIds = getManyList[1].includes(",") ? getManyList[1].split(",") : false;
    if (requestedIds) {
        for (let i = 0; i < requestedIds.length; i++) {
            let obj = await seqObj.findByPk(requestedIds[i]);
            list.push(obj);
        }
    } else {
        let obj = await seqObj.findByPk(getManyList[1]);
        list.push(obj);
    }
    return list;
}
async function getList(seqObj, list, secondList, field, order, minRange, maxRange) {
    list = await seqObj.findAll({
        order: [[field, order]],
    });
    for (let i = 0; i < list.length; i++) {
        if (i >= minRange && i <= maxRange) {
            secondList.push(list[i]);
        }
    }
    return list;
}
async function getListFiltered(seqObj, list, secondList, qeuryFilter, field, order, minRange, maxRange) {
    list = await seqObj.findAll({
        order: [[field, order]],
        where: {
            name: {
                [Op.like]: "%" + qeuryFilter + "%"
            }
        },
        limit: 10
    });
    for (let i = 0; i < list.length; i++) {
        if (i >= minRange && i <= maxRange) {
            secondList.push(list[i]);
        }
    }
    return list;
}
async function getById(seqObj, id) {
    const obj = await seqObj.findByPk(id);
    return obj;
}
async function updateOne(obj, data) {
    await obj.update(data)
}
async function createOne(seqObj, data) {
    console.log(data);
    const obj = await seqObj.create(data)
    return obj;
}
async function deleteOne(seqObj, id) {
    const obj = await seqObj.findByPk(id);
    await obj.destroy();
    return obj;
}

module.exports = { getMany, getList, getListFiltered, getById, updateOne, createOne, deleteOne };