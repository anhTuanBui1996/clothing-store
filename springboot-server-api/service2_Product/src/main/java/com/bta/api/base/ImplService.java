package com.bta.api.base;

public interface ImplService<E, D> {
	abstract E convertFromDtoToEntity(D dto);
}
