package com.bta.api.base;

import java.util.List;
import java.util.UUID;

public interface ImplService<E, D> {

	abstract List<E> getAll();

	abstract E getById(UUID id);

	abstract E create(D dto);

	abstract E update(D dto);

	abstract boolean delete (UUID id);

	abstract E convertFromDtoToEntity(D dto);

}
