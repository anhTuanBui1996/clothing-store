package com.bta.api.base;

import java.util.List;
import java.util.UUID;

public interface ImplService<E, D> {

	abstract List<E> getAll();

	abstract E getById(UUID id);

	abstract E create(D dto);

	abstract E update(D dto);

	abstract List<E> updateCollection(List<D> dtos);

	abstract boolean delete (UUID id);

	abstract List<Boolean> deleteCollection(List<UUID> ids);

	abstract E convertFromDtoToEntity(D dto);

}
