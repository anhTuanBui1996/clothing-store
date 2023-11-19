package com.bta.api.base;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface CRUDService<D> {

	abstract List<D> getAll();

	abstract D getById(UUID id);

	abstract D save(D dto);

	abstract List<D> saveCollection(List<D> dtos);

	abstract boolean delete (UUID id);

	abstract boolean deleteCollection(Set<UUID> ids);

}
