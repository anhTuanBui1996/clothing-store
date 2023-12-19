package com.api.service.base;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface CRUDService<E, D> {

	abstract List<D> getAll();

	abstract D getById(UUID id);

	abstract D save(D dto);

	abstract List<D> saveCollection(List<D> dtos);

	abstract boolean delete (UUID id);

	abstract List<UUID> deleteCollection(Set<UUID> ids);

	abstract E applyChangesFromDto(D dto);

}
