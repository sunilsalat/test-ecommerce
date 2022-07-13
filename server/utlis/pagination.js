const getPaginatedResult = async (
  model,
  filter,
  propulate = [],
  page,
  pageSize
) => {
  var result = {
    data: [],
    total: 0,
    currentPage: page,
    perPage: pageSize,
    lastPage: 0,
    hasMorePages: false,
    nextPage: 0,
    previousPage: 0,
  };

  const data = await model
    .find(filter)
    .populate([...propulate])
    .limit(pageSize)
    .skip((page - 1) * pageSize);

  const total = await model.find(filter).count();

  result.data = data;
  result.total = total;
  result.currentPage = page;
  result.lastPage = Math.ceil(total / pageSize);
  result.hasMorePages = result.lastPage < result.currentPage ? true : false;
  result.nextPage =
    result.lastPage < result.currentPage ? result.currentPage + 1 : 0;
  result.previousPage = result.currentPage > 1 ? result.currentPage - 1 : 0;

  return result;
};

module.exports = getPaginatedResult;
