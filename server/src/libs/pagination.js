module.exports = async (model, page, limit, query) => {
    const totalRow = await model.find(query).countDocuments();
    const totalPages = Math.ceil(totalRow /limit);
    const next = page + 1;
    const prev = page - 1;
    const hasNext = next <= totalPages ? true : false;
    const hasPrev = prev > 0 ? true : false;
    return  {
        totalPages,
        currentPage : page,
        hasNext,
        hasPrev
    }
}